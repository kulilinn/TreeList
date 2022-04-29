import React, {useState, useEffect} from 'react';
import {Card, Space, Tree} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import styles from './index.less';
import PropTypes from 'prop-types';

const {DirectoryTree} = Tree;

/**
 *
 * TreeListEx action button
 * @param {*} props
 * @return {*} node
 *
 */
const TreeListExOp = (props) => {
  const {TreelistExHeadBtns} = props;
  return (
    <Space>
      {TreelistExHeadBtns &&
        TreelistExHeadBtns.map((item, idx) => {
          return <React.Fragment key={idx}>{item.btn}</React.Fragment>;
        })}
    </Space>
  );
};
TreeListExOp.propTypes = {
  TreelistExHeadBtns: PropTypes.array,
};

const TreeListEx = (props) => {
  const {onSelectTreeListEx, treeData, TreelistExHeadBtns, selectedKeys} =
    props;
  // setting Adaptive height(自适应高度)
  const [tableHight, setTableHight] = useState(document.documentElement.clientHeight - 370);
  // Adaptive height change function (自适应高度修改方法)
  const screenChange = () => {
    setTableHight(document.documentElement.clientHeight - 370);
  };
  useEffect(() => {
    // init Adaptive height adds screen change events(自适应高度添加屏幕改变事件)
    window.addEventListener('resize', screenChange);
    return () => {
      // uninstall
      window.removeEventListener('resize', screenChange);
    };
  }, []);
  const {headTitle} = props;
  return (
    <Card
      title={headTitle?headTitle:null}
      extra={TreelistExHeadBtns?<TreeListExOp TreelistExHeadBtns={TreelistExHeadBtns} />:null}
      className={styles.roles_treelist_cont}
    >
      <DirectoryTree
        height={tableHight}
        showIcon
        onSelect={onSelectTreeListEx}
        defaultExpandAll
        selectedKeys={selectedKeys}
        switcherIcon={<DownOutlined />}
        treeData={treeData}
      />
    </Card>
  );
};
export default TreeListEx;
TreeListEx.propTypes = {
  onSelectTreeListEx: PropTypes.func,
  treeData: PropTypes.array,
  selectedKeys: PropTypes.array,
  TreelistExHeadBtns: PropTypes.array,
  headTitle: PropTypes.string,
};
