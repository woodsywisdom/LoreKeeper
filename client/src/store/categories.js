// import Cookies from 'js-cookie';

const SET_CATEGORIES = 'categories/SET_CATEGORIES';


export const setCategories = categories => {
  return ({
    type: SET_CATEGORIES,
    categories,
  });
}

// export const getCategories = () => async dispatch => {
//   const csrf_token = Cookies.get('XSRF-TOKEN');

//   const res = await fetch('/api/categories/', {
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-CSRFTOKEN': csrf_token
//     },
//   });
//   const data = await res.json();
//   if (res.ok) {
//     dispatch(setCategories(data));
//   }
//   return res;
// }

export default function categoryReducer(state=[], action) {
  // let newState = [...state];
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
