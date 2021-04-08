import { Table, Divider, Tag, Button, Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
const { Column, ColumnGroup } = Table;

class List extends Component {

  fetch = () => {
    this.props.dispatch({
      type: 'employees/fetch',
    });
  }

  commit = (key) => {
    this.props.dispatch({
      type: 'employees/commit',
    });
  }

  recover = (key) => {
    this.props.dispatch({
      type: 'employees/recover',
    });
  }

  delete = key => {
    this.props.dispatch({
      type: 'employees/delete',
      payload: key,
    });
  };

  render() {
    return (
      <Card
        extra={
          <div>
            <Button onClick={this.fetch}>Fetch</Button>
            <Button onClick={this.recover}>Recover</Button>
            <Button onClick={this.commit}>Commit</Button>
          </div>
        }
      >
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
                <Link to={`/employee?key=${record.key}`}>Edit {record.lastName}</Link>
                <Divider type="vertical" />
                <div style={{color: "#CC0000"}} onClick={e => this.delete(record.key)}>Delete</div>
              </span>
            )}
          />
        </Table>
      </Card>
    );
  }
}

export default connect(({ employees }) => ({ data: employees }))(List);
