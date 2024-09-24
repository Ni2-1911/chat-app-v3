export default function SearchBar() {
  return (
    <div className="searchBarWrapper flex-center rounded-sm">
      <i className="bx bx-search p-4"></i>
      <input
        className="searchBar rounded-sm w-90"
        placeholder="Search"
        type="text"
      />
    </div>
  );
}
