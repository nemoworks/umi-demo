import request from 'umi-request';
// const employeeList = [
//   {
//     key: '1',
//     firstName: 'John',
//     lastName: 'Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     firstName: 'Jim',
//     lastName: 'Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     firstName: 'Joe',
//     lastName: 'Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];
export default {
  namespace: 'employees',
  state: [],
  //state 可读不可写
  reducers: {
    init(state, {payload: data}){
      return data
    },
    concat(state, {payload: data}){
      let next = state
      next = next.concat(data)
      next.forEach((item, index) => item.key = (index+1).toString())
      return next
    },
    'delete'(state, { payload: id }) {
      return state.filter(item => item.key !== id);
    },
    'append'(state, { payload: info}) {
      let next = state
      next.push({
        key: (state.length+1).toString(),
        tags: [],
        ...info
      })
      return next
    },
    'edit'(state, { payload: info}) {
      let index = state.findIndex(item => item.key === info.key)
      let next = state
      next[index] = info
      return next
    }
  },
  effects: {
    *fetch(_, {call, put}){
      let data = yield call(request.get, '/api/employees')
      yield put({
        type: 'init',
        payload: data
      })
    },
    *commit(_, {call, put, select}){
      let data = yield select(store => store.employees)
      yield call(request.post, '/api/employees', { data: data })
    },
    *recover(_, {call, put}){
      yield call(request.get, '/api/recover')
    }
  }
};