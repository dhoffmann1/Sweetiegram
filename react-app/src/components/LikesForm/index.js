import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { getLikesThunk, createLikesThunk, deleteLikesThunk } from '../../store/likes'


function postLikes() {

    const dispatch = useDispatch()
    const { postId } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);

    //how am i going to get the post id? 
    const posts = useSelector(state => Object.values(state.posts))
    console.log(posts)
    
    useEffect(() => {
        dispatch()
    }, [dispatch])



    let likesComponent
    //user hasnt like the post
    if (likesUserId.includes(user.id)) {
        likesComponent = (
            <div style={{ marginRight: '15px' }} className="mainpage-interface-icons">
                <i class="fa-solid fa-heart" id='likesHeart' onClick={dispatch(deleteLikesThunk(user.id))}></i>
            </div>
        )

    } else {
        likesComponent = (
            <div style={{ marginRight: '15px' }} className="mainpage-interface-icons">
                <i class="fa-regular fa-heart" onClick={dispatch(createLikesThunk(user.id))}></i>
            </div>
        )
    }

    //liked the post, then when you click the button, it will remove the like

    // if you are the user and you

    return (
        <>
            <button onClick={""}> </button>
        </>
    )



}
