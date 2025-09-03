type Props = {
  product: any;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 max-h-[90vh] overflow-y-auto">
        <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
        <h2 className="text-2xl text-text-pink mb-2">{product.name}</h2>
        <p className="text-text-main mb-1"><strong>Descrizione:</strong> {product.desc}</p>
        <p className="text-text-main mb-1"><strong>Categoria:</strong> {product.category}</p>
        <p className="text-text-main mb-1"><strong>Ingredienti:</strong> {product.ingredients}</p>
        <p className="text-text-main mb-1"><strong>Allergeni:</strong> {product.allergen}</p>
        <p className="text-text-main mb-1"><strong>Conservazione:</strong> {product.conservation}</p>
        <p className="text-text-main mb-1"><strong>Note:</strong> {product.note}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-accent text-white px-4 py-2 rounded-lg hover:bg-text-pink"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
}
