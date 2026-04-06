import { getCategories } from "@/src/services/categories"
import Link from "next/link"
import { redirect } from "next/navigation"

const NavSection = async () => {

    const categories = await getCategories()

    return (
        <div className="flex justify-center mb-3 gap-10">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/${category.id}`}
                    className="cursor-pointer uppercase font-light"
                >
                    {category.name}
                </Link>
            ))}
        </div>
    )
}
export default NavSection