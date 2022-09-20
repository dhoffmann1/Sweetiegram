
// Action Type Variables 
const CREATE = "comment/CREATE"
const READ = "comment/READ"
const UPDATE = "comment/UPDATE"
const DELETE = "comment/DELETE"


// AC => CREATE 
const createComments = (comments) => ({
    type: CREATE,
    comments
})


// AC => READ 
const readComment = (comment) => {
    return {
        type: CREATE,
        comment
    }
}


// AC => UPDATE 

const updateComments = (comment) => {
    return {
        type: UPDATE,
        comment
    }
}


// AC => DELETE 

const deleteComment = (comment) => {
    return {
        type: DELETE,
        comment 
    }
}

// THUNK ACs




//Reducer
const commentReducer = (state = {}, action) => {
    switch (action.type) {
      
      default:
        return state;
    }
  };
  
  export default commentReducer;


