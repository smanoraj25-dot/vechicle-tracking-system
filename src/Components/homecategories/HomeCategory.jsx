import "../homecategories/HomeCategory.css"
const HomeCategory = ({items,handleNavigate}) => {
    return (
        <>
            <div className="hm-cat-wrapper" onClick={()=>handleNavigate("catprod")}>
                <img src={items.img} alt={items.imgCaption} className="w-100" loading="lazy" />
                <div className="hm-cat-h-wrapper-body">
                    {/* <p><strong>Lehengas</strong></p> */}
                   <button className="cat-cat-btn">Shop Now</button>
                </div>
            </div>
        </>
    )
}

export default HomeCategory
