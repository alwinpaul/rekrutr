import { ReactNode } from 'react'

interface BulletItemInterface {
    bulletColor: string,
    bulletDisplay: 'inline' | 'block',
    children?: ReactNode
}

export default function BulletItem(props: BulletItemInterface) {
    return (
        <div className={`${props.bulletDisplay === 'inline' ? 'inline-flex' : 'flex'} items-center justify-center space-x-1 mr-4`}>
            <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: props.bulletColor }}></div>
            <div className="capitalize">{props.children}</div>
        </div>
    )
}
