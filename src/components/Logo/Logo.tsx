import './Logo.css'

const Logo: React.FC = () => {
    const logo = '/src/assets/dashboard-triangle.png'

    return (
        <section className='logo'>
            <img
                src={logo}
                className='dashboard-triangle'
                alt='logo'
            />
            Task.ify
        </section>
    )
}

export default Logo