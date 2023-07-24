import './AddTaskCardForm.css'

const AddTaskCardForm: React.FC = () => {
    /**
     * <>@todo add a task form that adds a task to the database
     */
    /**
     * <>@todo animate dashboard to slide down when switching modes.
     * <>@todo animate add-task-card section to expand when form isActive
     * <>@todo animate tertiary selection on the form
     * <>@todo animate fade in for new card on feed
     * <>@todo animate task card to lift on hover
     * <>@todo animate play button to lift on hover/ press on click
     * <>@todo animate transition in from spotify redirect
     * <>@todo animate fade in for form components when form isActive
     * <>@todo vertically center category bar
     * <>@todo add hover effect to category bar
     * <>@todo add delete task button
     * <>@todo add short tour feature fab to stretch backlog.
     */
    return (
        <form>
            <section className='form-row'>
                <section className='form-col'>
                    <h2 className='taskifier-title'>Task.ifier</h2>
                    <section className='generate-square'></section>
                </section>
                <section className='inputs-col'>
                    <label
                        htmlFor='task-name'
                        className='task-name'>
                        Task Name
                    </label>
                    <input
                        type='text'
                        className='input-field'
                        id='task-name'
                    />
                    <label
                        htmlFor='vibe'
                        className='vibe'>
                        Vibe
                    </label>
                    <input
                        type='text'
                        className='input-field'
                        id='vibe'
                    />
                    <label
                        htmlFor='duration'
                        className='duration'>
                        Duration
                    </label>
                    <input
                        type='text'
                        className='input-field'
                        id='duration'
                    />
                    <label
                        htmlFor='category'
                        className='category'>
                        Category
                    </label>
                    <input
                        type='text'
                        className='input-field'
                        id='category'
                    />
                </section>
            </section>
            <section className='form-row button-row'>
                <button className='generate-button'>Generate Playlist</button>
            </section>
        </form>
    )
}

export default AddTaskCardForm
