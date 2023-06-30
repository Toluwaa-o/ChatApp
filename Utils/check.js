import { BsCheckAll, BsCheck } from 'react-icons/bs'

const checkMark = (bool) => {
    if(bool) return <BsCheckAll size={23} color='lightBlue' />
    return <BsCheck color='white' size={23} />
}

export default checkMark