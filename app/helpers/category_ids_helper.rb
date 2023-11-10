class CategoryIdsHelper
    def self.fetch_categories
      categories = Category.all.map { |category| category.name }
      return categories
    end
end  