const items=[
    {
       item_id:1,
       item_name: 'IPad Pro',
       item_description:"The iPad Pro is Apple's high-end tablet computer. The latest iPad Pro models feature a powerful M1 chip, a Thunderbolt port, an improved front-facing camera, a Liquid Retina XDR mini-LED display option on the larger model, and up to 16GB of RAM and 2TB of storage.",
       item_cost:1989.95,
       item_image:'https://www.apple.com/newsroom/images/product/ipad/standard/apple_ipad-pro-spring21_hero_04202021_big.jpg.large.jpg',
       item_tags:''
    },
    {
        item_id:2,
        item_name: 'DJI Mavir Air Pro Drone',
        item_description:"Mavic Air 2 takes power and portability to the next level, offering advanced features in a compact form factor. Intelligent shooting functions and excellent image quality put aerial masterpieces within reach. Safer, smarter flight enables you to up your game while fully enjoying the creative process.",
        item_cost:799,
        item_image:'https://cdn.mos.cms.futurecdn.net/2mjes2QKryVCmU9dEReL6L.jpg',
        item_tags:''
    },
    {
        item_id:3,
        item_name: 'Canon EOS R5 Camera',
        item_description:"Revolutionary 8K video performance with unparalleled combined image stabilisation mirrorless camera.",
        item_cost:3899,
        item_image:'https://i1.adis.ws/i/canon/eos-r5_martin_bissig_lifestyle_05_c629aad3c2154f34b3d7d7ba5a509196?$70-30-header-4by3-dt-jpg$',
        item_tags:''
    }
]
    


exports.seed=function(knex){
    return knex('items').insert(items)
}