import React from 'react';
import { Modal } from '../../context/Modal';
import PostDetails from './PostDetails';

function PostDetailsModal({ setShowPostDetailsModal, post }) {
  // const [showModal, setShowModal] = useState(false);
  console.log('should go to post details modal component')
  return (
    <>
      {/* <div id="signup-button" onClick={() => setShowModal(true)}>Log in</div> */}
      <Modal onClose={() => setShowPostDetailsModal(false)}>
        <PostDetails setShowPostDetailsModal={setShowPostDetailsModal} post={post}/>
      </Modal>
    </>
  );
}

export default PostDetailsModal;
