import ReactDom from 'react-dom'

export default function Modal(props) {
    const { children, handleCloseModal } = props
    return ReactDom.createPortal(
        <div className='fixed top-0 left-0 w-screen h-screen'>
            <button className='w-full h-full bg-slate-800/80' onClick={handleCloseModal} />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 dark:bg-slate-800 p-4 min-w-60 max-w-[500px] rounded-lg '>
                {children}
            </div>
        </div>, document.getElementById('portal')
    )
}
