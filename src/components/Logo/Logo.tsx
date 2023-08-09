import triangle from '../../../public/dashboard-triangle.png'
import './Logo.css'

const Logo: React.FC = () => {

    return (
        <section className='logo'>
            <img
                src={triangle}
                className='dashboard-triangle'
                alt='logo'
            />
            Task.ify
        </section>
    )
}

export default Logo