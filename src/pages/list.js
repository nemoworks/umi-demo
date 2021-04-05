import { Table, Divider, Tag } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
const { Column, ColumnGroup } = Table;


class List extends Component {
  constructor(props) {
    super(props);
  }
  
  delete = (key) => {
    this.props.dispatch({
      type: 'employees/delete',
      payload: key,
    });
  }

  render() {
    return (
      <Table dataSource={this.props.data}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <span>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a>Invite {record.lastName}</a>
              <Divider type="vertical" />
              <a onClick={(e)=>this.delete(record.key)}>Delete</a>
            </span>
          )}
        />
      </Table>
    );
  }
}


export default connect(({employees})=>({data: employees}) )(List)