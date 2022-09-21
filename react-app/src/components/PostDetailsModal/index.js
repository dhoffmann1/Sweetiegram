import React from 'react';
import { Modal } from '../../context/Modal';
import PostDetails from './PostDetails';

function PostDetailsModal({ setShowPostDetailsModal, post }) {
  // const [showModal, setShowModal] = useState(false);

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
