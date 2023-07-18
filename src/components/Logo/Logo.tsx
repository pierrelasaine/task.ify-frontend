export default function Logo() {
    const logo = 'logo Asset URL'

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
