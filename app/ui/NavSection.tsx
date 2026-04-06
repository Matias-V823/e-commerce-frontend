import { getCategories } from "@/src/services/categories"

const NavSection = async () => {

    const categories = await getCategories()

    console.log(categories)

    return (
        <div className="flex justify-center mb-3 gap-10">
            {categories.map((category) => (
                <span key={category.id} className="cursor-pointer uppercase font-light">{category.name}</span>
            ))}
        </div>
    )
}
export default NavSection