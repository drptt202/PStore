/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Rating, Textarea } from '@material-tailwind/react'
import { useContext, useState } from 'react'
import { CommentContext } from '../../Contexts/CommentContext'
import { OPEN_COMMENT } from '../../reducers/types'
import axiosCustom from '../../utils/axiosCustom'
import { toast } from 'react-hot-toast'

const RatingProduct = (props) => {
    const { item } = props
    const { open, dispatch } = useContext(CommentContext)
    const [Point, setPoint] = useState(5)
    const [Title, setTitle] = useState('')
    const handleSend = () => {
        axiosCustom.post('/cart/comment/post', {
            Point: Point,
            Title: Title,
            Employee: item.Employee,
            Item: item.Item.Code,
            OrderDate: item.OrderDate,
            AcceptDate: item.AcceptDate,
            Date: item.Date,
            Address: item.Address,
        }).then(() => { window.location.reload(); toast.success('Đã gửi đánh giá') })
            .catch(err => { console.log(err) })
    }

    return (
        <>
            <Dialog open={open} handler={() => dispatch({ type: OPEN_COMMENT })}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Gửi đánh giá</DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={() => dispatch({ type: OPEN_COMMENT })}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Rating value={5} onChange={value => setPoint(value)} />
                        Lời nhắn:
                        <Textarea value={Title} onChange={e => setTitle(e.target.value)} />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={() => dispatch({ type: OPEN_COMMENT })}>
                        thoát
                    </Button>
                    <Button variant="gradient" color="green" onClick={() => { dispatch({ type: OPEN_COMMENT }); handleSend() }}>
                        gửi đánh giá
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default RatingProduct