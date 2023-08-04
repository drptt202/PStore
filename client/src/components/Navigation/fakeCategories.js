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
                href: '/console/Play%20station%205%20Standard%20Edition',
                imageSrc: ps5,
                imageAlt: 'may-ps5-gia-re',
            },
            {
                name: 'Bán chạy',
                href: '/console/Nintendo%20Switch%20Oled',
                imageSrc: nintendo,
                imageAlt: 'may-nintendo-switch-oled',
            },
        ],
        sections: [
            {
                id: 'brand',
                name: 'Hãng',
                items: [
                    { name: 'Sony', href: '/console?brand=Sony' },
                    { name: 'Nintendo', href: '/console?brand=Nintendo' },
                    { name: 'Microsoft', href: '/console?brand=Microsoft' }
                ],
            },
            {
                id: 'priceband',
                name: 'Mức giá',
                items: [
                    { name: 'Tăng dần', href: '/console?order=ASC' },
                    { name: 'Giảm dần', href: '/console?order=DESC' }
                ],
            },
            {
                id: 'more',
                name: '',
                items: [{ name: 'Xem tất cả', href: '/console' },]
            }
        ],
    },
    {
        id: 'game',
        name: 'Game',
        featured: [
            {
                name: 'Sản phẩm nổi bật',
                href: '/game/FIFA%2023',
                imageSrc: ff23,
                imageAlt: 'dia-game-ps4-moi-fifa-23',
            },
            {
                name: 'Bán chạy',
                href: '/game/FIFA',
                imageSrc: ff19,
                imageAlt: 'game-nintendo-switch-fifa-19',
            },
        ],
        sections: [
            {
                id: 'brand',
                name: 'Hãng',
                items: [
                    { name: 'Sony', href: '/game?brand=Sony' },
                    { name: 'Microsoft', href: '/game?brand=Microsoft' },
                    { name: 'Nintendo', href: '/game?brand=Nintendo' },
                    { name: 'EA', href: '/game?brand=EA' }
                ],
            },
            {
                id: 'priceband',
                name: 'Mức giá',
                items: [
                    { name: 'Tăng dần', href: '/game?order=ASC' },
                    { name: 'Giảm dần', href: '/game?order=DESC' }
                ],
            },
            {
                id: 'more',
                name: '',
                items: [{ name: 'Xem tất cả', href: '/game' },]
            }
        ],
    },
    {
        id: 'pad',
        name: 'Phụ kiện',
        featured: [
            {
                name: 'Sản phẩm nổi bật',
                href: '/pad/PS5%20DualSense%20White',
                imageSrc: ps,
                imageAlt: 'tay-cam-ps5-dualsense',
            },
            {
                name: 'Bán chạy',
                href: '/pad/Xbox%20Series%20-%20Starfield%20Limited%20Edition',
                imageSrc: xbox,
                imageAlt: 'tay-cam-xbox-series',
            },
        ],
        sections: [
            {
                id: 'brand',
                name: 'Hãng',
                items: [
                    { name: 'Sony', href: '/pad?brand=Sony' },
                    { name: 'Nintendo', href: '/pad?brand=Nintendo' },
                    { name: 'Microsoft', href: '/pad?brand=Microsoft' },
                    { name: 'Razor', href: '/pad?brand=Razor' }
                ],
            },
            {
                id: 'priceband',
                name: 'Mức giá',
                items: [
                    { name: 'Tăng dần', href: '/pad?order=ASC' },
                    { name: 'Giảm dần', href: '/pad?order=DESC' }
                ],
            },
            {
                id: 'more',
                name: '',
                items: [{ name: 'Xem tất cả', href: '/pad' },]
            }
        ],
    },
]