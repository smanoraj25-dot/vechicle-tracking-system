import React from 'react'
import abtimgbg from '../../assets/images/bg-2.png'
import bannerimg from "../../assets/images/banner-images/home-banner-1.jpg"
import "./Stories.css"
const Stories = () => {
  return (
    <>
        <section className='abt-storie-sec-wrap abt-stories-bg'>
            <img src={abtimgbg} alt="" className='abtimgbg' />
            <img src={abtimgbg} alt="" className='abtimgbg abt-st-2' />
            <div className="container">
                <div className="row row-gap-5 align-items-center">
                    <div className="col-md-6">
                        <h3 className='abt-str-title'>The Seelaikaari Story</h3>
                        <p className='abt-cont'>
                        Seelaikaari is a brand that has organically evolved since its inception in 2013. People have always been curious about the name, which denotes the address of the space where our designs are crafted, and which now also houses the ready-to-wear collection. Our brand specializes in creating exclusive couture for women, focusing on intricate cuts, an eclectic mix of the finest handloom Kanchipuram silks, appealing silhouettes, contemporary drapes, and exquisite embellishments.
                        </p>
                        <p className='abt-cont'>
                        At Seelaikaari, we focus on the nature of the women who wear our creations, ensuring that each piece complements their individuality and empowers them with the confidence to face the world. In a time where fashion trends are often dictated by a narrow view of what suits only a few, Seelaikaari strives to create garments that flatter different personalities and body types, all while remaining stylish and chic.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img src={bannerimg} alt="" className='w-100' />
                    </div>
                </div>
            </div>
        </section>
        <section className='abt-storie-sec-wrap'>
            <div className="container">
                <div className="row row-gap-5 align-items-center">
                   
                    <div className="col-md-6">
                        <img src={bannerimg} alt="" className='w-100' />
                        
                       
                    </div>
                    <div className="col-md-6">
                        <h3 className='abt-str-title'><b>Seelaikaari : </b> Where Timeless Fashion Meets Bold Self-Expression</h3>
                        <p className='abt-cont'>Fashion is for everyone, and it is a means of self-expression. We, at Seelaikaari, are committed to creating timeless outfits that serve as valuable additions to your wardrobe. Headed by Amrutha, the founder, and a team of young, vibrant designers with diverse backgrounds in fashion, Seelaikaari is an ever-evolving label.</p>
                        <p className='abt-cont'>
                        Together with our exceptional team of craftsmen, we design and handcraft unique outfits that perfectly complement every changing season in fashion, ensuring our clients always make a bold fashion statement.

                        </p>
                       
                      
                        
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Stories