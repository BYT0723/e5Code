<template>
  <div class="contentCode">
    <div class="fileTree">
      <el-tree
        :data="treeFiles"
        :props="defaultProps"
        node-key="path"
        style="height:87vh"
        :default-expanded-keys="['']"
        :expand-on-click-node="false"
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        draggable
        @node-click="handleNodeClick"
        >

        <div class="treeNode" slot-scope="{ node }">
          <i :class="getIcon(node.data)"></i>
          {{ node.label }}
          <el-dropdown placement="right-start" trigger="click" @command="handleDropdown">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="!node.data.isFile" :command="handleCommand('new',node)">新建</el-dropdown-item>
              <el-dropdown-item v-if="!node.data.isFile" :command="handleCommand('newDir',node)">新建文件夹</el-dropdown-item>
              <el-dropdown-item :command="handleCommand('open',node)">打开</el-dropdown-item>
              <el-dropdown-item :command="handleCommand('delete',node)">删除</el-dropdown-item>
              <el-dropdown-item :command="handleCommand('rename',node)">重命名</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-tree>
    </div>
    <div class="coding" v-if="codeKey !== ''">
      <el-tabs 
      v-model="editableTabsValue"
      type="border-card"
      closable @edit="handleTabsEdit"
      @tab-click="handleTabsSwitch">
        <el-tab-pane
          :key="item.name"
          v-for="(item) in editableTabs"
          :label="item.title"
          :name="item.name">
          <el-input v-model="code" type="textarea" rows="35" resize="none" @keydown.tab.native="tabInput($event)"></el-input>
          <div class="codeOpearte">
            <el-row class="row"><el-button type="success" @click="saveFile">保存</el-button></el-row>
            <el-row class="row"><el-button type="primary" @click="drawer = true">提交</el-button></el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-drawer title="提交信息" :visible.sync="drawer" :direction="direction" :before-close="handleClose" class="commitDrawer">
      <div class="commitInfo">
        <div class="gitStatus">
          <el-checkbox-group v-model="commitInfo.selectedFiles" v-for="file in commitInfo.statusFiles" :key="file.path">
            <el-row><el-checkbox :label="file.status + ' | ' +file.path"></el-checkbox></el-row>
          </el-checkbox-group>
        </div>
        <el-row class="row"><el-input type="text" v-model="commitInfo.msg" placeholder="描述些什么"></el-input></el-row>
        <el-row class="row" style="text-align: right"><el-button type="success" @click="commitPush">提交</el-button></el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { listProjectAllFiles,createFile,readFile,updateFile,moveFile,deleteFile,mkDir,workStatus,commit } from '../../util/api.js'

export default {
  name: 'CODE',
  data() {
    return {
      treeFiles: [{
        name: this.$route.params.projectName,
        path: "",
        children: [],
      }],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      editableTabsValue: '',
      editableTabs: [],
      tabIndex: 1,
      code: '',
      codeKey: '',
      activeCodes: [],
      olderCodes: [],
      drawer: false,
      direction: "rtl",
      commitInfo: {
        statusFiles: [],
        selectedFiles: [],
        msg: '',
      }
    }
  },
  watch: {
    codeKey(val) {
      this.code = this.activeCodes[val]
    },
    code(val) {
      this.activeCodes[this.codeKey] = val
      // 判断文件内容是否更改，并改变tab.title
      if(this.activeCodes[this.codeKey] !== this.olderCodes[this.codeKey]){
        let res = this.editableTabs.filter(f => {
          return f.name === this.codeKey && f.title.lastIndexOf('*') !== f.title.length-1
        })      
        if(res.length > 0){
          res[0].title += '*'
        }
      }else{
        let res = this.editableTabs.filter(f => {
          return f.name === this.codeKey && f.title.lastIndexOf('*') === f.title.length-1
        })      
        if(res.length > 0){
          res[0].title = res[0].title.slice(0,res[0].title.length-1)
        }
      }
    },
    drawer(val){
      if(val){
        let param = { id: this.$route.query.id }
        workStatus(param).then(res => {
          if(res.data['code']==null) {
            this.commitInfo.statusFiles = res.data['result']
          }else{
            this.$message.error(res.data['msg'])
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  },
  mounted(){
    //获取文件信息
    let param = { id: this.$route.query.id, path: '', isWork: true }
    listProjectAllFiles(param).then(res => {
      if(res.data['code']==null) {
        this.files = res.data['result']
        this.files.sort((a,b) => {
          return a.isFile-b.isFile
        })
        this.treeFiles[0].children = this.files
      }else{
        this.$message.error(res.data['msg'])
      }
    }).catch(err => {
      this.$message.error(err)
    })
    if(this.$route.query.path !== null){
      let path = this.$route.query.path
      let name = path.split('/')[path.length-1]
      this.handleNodeClick({name:name,paht:path,isFile: true})
    }
  },
  methods: {
    //tree处理
    handleDragStart(node, ev) {
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    },
    handleCommand(command,node){
      return{
        name: command,
        node: node,
      }
    },
    handleDropdown(command){
      switch(command.name){
        case "new": this.newFile(command.node); break;
        case "newDir":this.newDir(command.node); break;
        case "open": this.open(command.node); break;
        case "rename": this.rename(command.node); break;
        case "delete": this.deleteNode(command.node); break;
      }
    },
    newFile(node){
      this.$prompt('请输入文件名', '操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z]+[a-zA-Z0-9-_./]*$/,
        inputErrorMessage: '非法文件名'
      }).then(({ value }) => {
        let parent = node.data
        let path = parent.path === "" ? value:parent.path+"/"+value
        let param = { id: this.$route.query.id, path: path }
        createFile(param).then(res => {
          if(res.data['code']==null) {
            if(!parent.children) {
              this.$set(parent,"children",[])
            }
            parent.children.push({
              name: value,
              isFile: true,
              mode: "File",
              isNew: true,
              path: path,
              children: [],
            })
          }else{
            this.$message.error("创建失败")
            console.log(res.data['msg'])
          }
        }).catch(err => {
          this.$message.error(err)
        })

      })
    },
    newDir(node){
      this.$prompt('请输入目录路径(eg: dir1/dir2/dir3)', '操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z]+[a-zA-Z0-9-_./]*$/,
        inputErrorMessage: '非法路径'
      }).then(({ value }) => {
        let path = node.data.path + "/"+value
        let param = { id: this.$route.query.id, path: path }
        mkDir(param).then(res => {
          if(res.data['code']==null) {
            let paths = value.split('/')
            let parent = node.data
            for(let i in paths){
              if (parent.children.filter(d => d.name === paths[i] && !d.isFile).length === 0) {
                if(!parent.children) {
                  this.$set(parent,"children",[])
                }
                parent.children.push({
                  name: paths[i],
                  isFile: false,
                  mode: "Dir",
                  path: parent.path === "" ? paths[i]:parent.path+"/"+paths[i],
                  children: [],
                })
              }
              parent = parent.children.filter(c => c.name === paths[i] && !c.isFile )[0]
            }
            node.data.children.sort( (a,b) => a.isFile - b.isFile )
          }else{
            this.$message.error("创建失败")
            console.log(res.data['msg'])
          }
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    open(node){
      if(!node.data.isFile){
        node.expanded = !node.expanded
      }else{
        this.handleNodeClick(node.data)
      }
    },
    rename(node){
      this.$prompt('请输入文件名', '操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z]+[a-zA-Z0-9-_.]*$/,
        inputErrorMessage: '非法文件名'
      }).then(({ value }) => {
        let newpath = node.parent.data.path+"/"+value
        let param = { id: this.$route.query.id, oldpath: node.data.path, newpath: newpath}
        moveFile(param).then(res => {
          if(res.data['code']==null) {
            node.data.name = value
            node.data.path = newpath
          }else{
            this.$message.error("重命名失败")
            console.log(res.data['msg'])
          }
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    deleteNode(node){
      let param = { id: this.$route.query.id, path: node.data.path}
      deleteFile(param).then(res => {
        if(res.data['code']==null) {
          this.$message.success("删除成功")
          this.editableTabs = this.editableTabs.filter(t => t.name !== node.data.path)
          let parent = node.parent;
          parent.data.children = parent.data.children.filter(f => f.path !== node.data.path)
        }else{
          this.$message.error("删除失败")
          console.log(res.data['msg'])
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 根据文件类型获取文件图表名称
    getIcon(file) {
      let prefix = "el-icon-"
      if(!file.isFile){
        return prefix+"folder"
      }
      return prefix+"document"
    },
    tabInput(e) {
      e.preventDefault()
      const insertText = '\t'
      const elInput = e.target
      const startPos = elInput.selectionStart
      const endPos = elInput.selectionEnd
      if (startPos === undefined || endPos === undefined) return
      const txt = elInput.value
      elInput.value = txt.substring(0, startPos) + insertText + txt.substring(endPos)
      elInput.focus()
      elInput.selectionStart = startPos + insertText.length;
      elInput.selectionEnd = startPos + insertText.length;
      this.inputValue = elInput.value
    },
    // 处理 Tree Node点击事件
    handleNodeClick(data){
      if(data.isFile !== null && data.isFile){
        if (this.editableTabs.filter(f => f.name === data.path).length > 0) {
          this.codeKey = data.path
          this.editableTabsValue = data.path
          return
        }else if (this.olderCodes[data.path] != null){
          this.codeKey = data.path
          this.editableTabs.push({
            title: data.name,
            name: data.path
          })
          this.editableTabsValue = data.path
        }else{
          let param = { id: this.$route.query.id, path: data.path, isWork: true }
          readFile(param).then(res => {
            if(res.data['code']==null) {
              this.activeCodes[data.path] = res.data['body']
              this.olderCodes[data.path] = res.data['body']
              this.codeKey = data.path
              this.editableTabs.push({
                title: data.name,
                name: data.path
              })
              this.editableTabsValue = data.path
            }else{
              this.$message.error(res.data['msg'])
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
      }
    },
    // 处理tab切换事件
    handleTabsSwitch(target){
      this.codeKey = target.name
    },
    // 处理tab增删事件
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: 'New Tab'+newTabName,
        });
        this.editableTabsValue = newTabName;
        this.activeCodes[newTabName] = ''
        this.olderCodes[newTabName] = ''
        this.codeKey = newTabName
      }
      if (action === 'remove') {
        if(this.editableTabs.length <= 1){
          this.$message.warning("最少存在一个窗口")
          return
        }
        if(this.activeCodes[targetName] !== this.olderCodes[targetName]){
          this.$confirm('文件有内容未保存,确认关闭？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
              tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab) {
                    activeName = nextTab.name;
                  }
                }
              });
            }
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            this.codeKey = activeName
          }).catch(() => {
            return
          });
        }else{
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          this.codeKey = activeName
        }
      }
    },
		// commit抽屉
		handleClose(done) {
			this.$confirm('确认退出编辑?').then(_ => {
					done();
				}).catch(_ => {});
    },
    saveFile(){
      let param = { id: this.$route.query.id, path: this.codeKey, body: this.activeCodes[this.codeKey]}
      updateFile(param).then(res => {
        if(res.data['code']==null){
          this.olderCodes[this.codeKey] = this.activeCodes[this.codeKey]
          this.$message.success("保存成功")
        }else{
          this.$message.error(res.data['msg'])
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    commitPush(){
      if( this.commitInfo.selectedFiles.length === 0 ){
        this.$message.warning("至少选择一个文件")
        return
      }
      let param = { id: this.$route.query.id, msg: this.commitInfo.msg, filePaths: this.commitInfo.selectedFiles }
      commit(param).then(res => {
      if(res.data['code']==null) {
        this.$message.success("提交成功")
        this.drawer = false
      }else{
        this.$message.error("提交失败")
        console.log(res.data['msg'])
      }
    }).catch(err => {
      this.$message.error(err)
    })
    }
  }
}
</script>

<style>
.contentCode {
  display: flex;
  justify-content: space-between;
  height: 87vh;
  border: 3px solid #999;
  padding: 2px;
  border-radius: 10px;
  overflow: hidden;
}

.fileTree{
  width: 17%;
}
.TreeNode{
  width: 100px;
}
.coding{
  width: 82.8%;
  position: relative;
}
.el-tabs__content {
  padding: 0px;
}
.codeOpearte{
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.codeOpearte .row {
  margin-top: 10px;
}
.commitInfo{
  width: 90%;
  margin: 0 auto;
}
.gitStatus{
  border: 1px solid #aaa;
  border-radius: 5px;
  height: 65vh;
  overflow: scroll;
}
.commitInfo .row {
  margin-top: 20px;
}
</style>
