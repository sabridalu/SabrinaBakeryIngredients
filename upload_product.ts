import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Usa la service_role key al posto della anon
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

const BUCKET = "product_image";

async function main() {
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "product.json"), "utf8")
  );

  for (const product of products) {
    const localPath = path.join(__dirname, product.img);
    const fileName = path.basename(product.img);

    if (!fs.existsSync(localPath)) {
      console.warn(`⚠️ File non trovato: ${localPath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(localPath);

    // Upload immagine
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(`product/${fileName}`, fileBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error(`❌ Errore upload ${fileName}:`, uploadError.message);
      continue;
    }

    // Public URL
    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(`product/${fileName}`);

    const publicUrl = data.publicUrl;

    // Update nel DB (bypassa RLS con service_role)
    const { error: updateError } = await supabase
      .from("product")
      .update({ img: publicUrl })
      .eq("id", product.id);

    if (updateError) {
      console.error(`❌ Errore update DB per ${product.name}:`, updateError.message);
    } else {
      console.log(`✅ ${product.name} aggiornato -> ${publicUrl}`);
    }
  }

  console.log("🎉 Upload e aggiornamento completato!");
}

main();
