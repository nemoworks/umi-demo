import dva from 'dva';
const employeeList = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default {
  namespace: 'employees',
  state: employeeList,
  reducers: {
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
      console.log(info)
      console.log(state)
      return next
    }
  },
};