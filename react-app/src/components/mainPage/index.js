import './main.css'
import Posts from '../Posts/index'
import Profiles from '../profiles/index'


function MainPage() {

    return (
        <>
            <div className='whole-page'>
                <div className="container-page">
                    <div className="left-main">
                        <div className="storiesbox">
                            {Profiles()}
                        </div>
                        <div className="postsbox">
                            {Posts()}
                        </div>

                    </div>
                    <div className="right-main">
                        <h1> profile button + more</h1>
                    </div>

                </div>
            </div>
        </>
    )



}

export default MainPage
