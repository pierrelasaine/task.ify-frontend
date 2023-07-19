const Logo: React.FC = () => {
    const logo = 'https://www.github.com/identicons/logo.png'

    return (
        <section className='logo'>
            <img
                src={logo}
                className='logo'
                alt='logo'
            />
            <h1>Task.ify</h1>
        </section>
    )
}

export default Logo