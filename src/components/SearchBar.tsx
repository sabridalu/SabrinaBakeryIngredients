type Props = {
  query: string;
  setQuery: (value: string) => void;
};

export default function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cerca per nome, categoria o allergeni"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
