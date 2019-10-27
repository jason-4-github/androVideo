import React from 'react';
import { connect } from 'react-redux';
import { Spin, Divider, Row, Icon, Col, Modal, Input, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import articleHeader from './../components/articleHeader';
import articleContent from './../components/articleContent';

const { TextArea } = Input;

class ArticleContainer extends React.Component {
  constructor(props){
    super(props);
    const currentUrls = window.location.href.split('/');
    const currentUrl = currentUrls[currentUrls.length - 1];
    const { articles } = this.props;
    this.state = {
      currentUrl: currentUrl,
      likeStatus: false,
      startStatus: false,
      linkStatus: false,
      editStatus: false,
      inputLinkValue: window.location.href,
      inputEditValue: articles ? articles[currentUrl] : '',
      editingValue: articles ? articles[currentUrl] : '',
    }
  }
  componentDidUpdate = (type) => {
    console.log(type)
    if(type.type === "LOAD_MARKDOWN_REQUEST" && this.props.type !== type.type) {
      this.setState({
        inputEditValue: this.props.articles[this.state.currentUrl],
        editingValue: this.props.articles[this.state.currentUrl],
      })
    }
  }

  handleLinkModalCancel = () => { this.setState({ linkStatus: false, }); };
  handleEditModalCancel = () => {
    this.setState({
      editStatus: false,
      editingValue: this.state.inputEditValue,
    });
  };
  onEditModalChange = (e) => {this.setState({ editingValue: e.target.value })}
  handleEditMadalOk = e => {
    this.setState({
      inputEditValue: this.state.editingValue,
      editStatus: false
    });
  };

  render(){
    const { articles } = this.props;
    const { currentUrl, likeStatus, starStatus, linkStatus, inputLinkValue, editStatus, editingValue, inputEditValue } = this.state;
    console.log(inputEditValue)
    return (
      <div>
        { articleHeader(`[Type] ${currentUrl}`, '') }
        <Divider />
        <Row style={{ textAlign: 'right' }}>
          <Col span={8} offset={16}>
            <Icon
              className="articleIcon"
              onClick={() => {
                this.setState({ likeStatus: likeStatus ? false : true })
                message.info({
                  content: !likeStatus ? 'Thank For Your Liking!' : 'Have Canceled Liking!',
                  icon: !likeStatus ? <Icon type="like" theme="filled" /> :<Icon type="frown" />
                })
              }}
              theme={likeStatus ? 'filled' : 'outlined' }
              type="like"
            />
            <Icon
              className="articleIcon"
              onClick={() => {
                this.setState({ starStatus: starStatus ? false : true })
                message.info({
                  content: !starStatus ? 'Thank For Your Staring!' : 'Have Canceled Staring!',
                  icon: !starStatus ? <Icon type="star" theme="filled" /> :<Icon type="frown" />
                })
              }}
              theme={starStatus ? 'filled' : 'outlined' }
              type="star"
            />
            <Icon
              className="articleIcon"
              onClick={() => { this.setState({ linkStatus: linkStatus ? false : true }) }}
              type="link"
            />
            <Icon type="edit" className="articleIcon" onClick={() => { this.setState({ editStatus: editStatus ? false : true }) }}/>

            <Modal
              key="link"
              title={false}
              visible={linkStatus}
              footer={false}
              onCancel={this.handleLinkModalCancel}
            >
              <p>Copy The Url Below To Share This Article !</p>
              <CopyToClipboard
                text={inputLinkValue}
                onCopy={() => message.info({
                  content: 'Have Copied To Your Clipboard!!',
                  icon: <Icon theme="filled" type="copy" />
                 })
                }
              >
                <Input
                  defaultValue={window.location.href}
                  value={inputLinkValue}
                  style={{ cursor: 'pointer'}}
                />
              </CopyToClipboard>
            </Modal>
            <Modal
              key="edit"
              width="70%"
              title={false}
              closable={false}
              maskClosable={false}
              visible={editStatus}
              onCancel={this.handleEditModalCancel}
              cancelText="Cancel Update"
              okText="Confirm Update"
              onOk={this.handleEditMadalOk}
            >
              <TextArea rows={20} value={editingValue} onChange={this.onEditModalChange} />

            </Modal>
          </Col>
        </Row>
        { articleContent(articles ? inputEditValue : <Spin />) }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.homepage,
  };
};

export default connect(
  mapStateToProps,
  {}
)(ArticleContainer);