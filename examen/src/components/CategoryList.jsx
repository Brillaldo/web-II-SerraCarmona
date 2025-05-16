function CategoryList({ categories, selected, onSelect }) {
  return (
    <div className="category-list">
      {categories.map((cat) => (
        <button
          key={cat.idCategory}
          className={cat.strCategory === selected ? "selected" : ""}
          onClick={() => onSelect(cat.strCategory)}
        >
          <img src={cat.strCategoryThumb} alt={cat.strCategory} />
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
