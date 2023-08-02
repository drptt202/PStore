import ps5 from '../../assets/img/may-ps5-gia-re-P1349-1621770999197.jpg'
import nintendo from '../../assets/img/may-nintendo-switch-oled-model---white-set-P1561-1625912535334.jpg'
import ff23 from '../../assets/img/dia-game-ps4-moi-fifa-23-P1635-1668155597150.jpg'
import ff19 from '../../assets/img/game-nintendo-switch-fifa-19-P1120-1537910766631.jpg'
import xbox from '../../assets/img/tay-cam-xbox-series---starfield-limited-edition-P1688-1686732643588.jpg'
import ps from '../../assets/img/tay-cam-ps5-dualsense-chinh-hang-P1518-1619840536830.jpg'

export const categories = [
    {
        id: 'console',
        name: 'Máy game',
        featured: [
            {
                name: 'Sản phẩm nổi bật',
                href: '#',
                imageSrc: ps5,
                imageAlt: 'may-ps5-gia-re',
            },
            {
                name: 'Bán chạy',
                href: '#',
                imageSrc: nintendo,
                imageAlt: 'may-nintendo-switch-oled',
            },
        ],
        sections: [
            {
                id: 'brand',
                name: 'Hãng',
                items: [
                    { name: 'Sony', href: '#' },
                    { name: 'Nintendo', href: '#' },
                    { name: 'Microsoft', href: '#' }
                ],
            },
            {
                id: 'priceband',
                name: 'Mức giá',
                items: [
                    { name: 'Tăng dần', href: '#' },
                    { name: 'Giảm dần', href: '#' }
                ],
            },
            {
                id: 'more',
                name: '',
                items: [{ name: 'Xem tất cả', href: 'may-game' },]
            }
        ],
    },
    {
        id: 'game',
        name: 'Game',
        featured: [
            {
                name: 'Sản phẩm nổi bật',
                href: '#',
                imageSrc: ff23,
                imageAlt: 'dia-game-ps4-moi-fifa-23',
            },
            {
                name: 'Bán chạy',
                href: '#',
                imageSrc: ff19,
                imageAlt: 'game-nintendo-switch-fifa-19',
            },
        ],
        sections: [
            {
                id: 'brand',
                name: 'Hãng',
                items: [
                    { name: 'Sony', href: '#' },
                    { name: 'Microsoft', href: '#' },
                    { name: 'Nintendo', href: '#' },
                    { name: 'EA', href: '#' }
                ],
            },
            {
                id: 'priceband',
                name: 'Mức giá',
                items: [
                    { name: 'Tăng dần', href: '#' },
                    { name: 'Giảm dần', href: '#' }
                ],
            },
            {
                id: 'more',
                name: '',
                items: [{ name: 'Xem tất cả', href: 'game' },]
            }
        ],
    },
    {
        id: 'pad',
        name: 'Phụ kiện',
        featured: [
            {
                name: 'Sản phẩm nổi bật',
                href: '#',
                imageSrc: ps,
                imageAlt: 'tay-cam-ps5-dualsense',
            },
            {
                name: 'Bán chạy',
                href: '#',
                imageSrc: xbox,
                imageAlt: 'tay-cam-xbox-series',
            },
        ],
        sections: [
            {
                id: 'brand',
                name: 'Hãng',
                items: [
                    { name: 'Sony', href: '#' },
                    { name: 'Nintendo', href: '#' },
                    { name: 'Microsoft', href: '#' },
                    { name: 'Razor', href: '#' }
                ],
            },
            {
                id: 'priceband',
                name: 'Mức giá',
                items: [
                    { name: 'Tăng dần', href: '#' },
                    { name: 'Giảm dần', href: '#' }
                ],
            },
            {
                id: 'more',
                name: '',
                items: [{ name: 'Xem tất cả', href: 'phu-kien' },]
            }
        ],
    },
]