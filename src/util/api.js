import {user,project} from "../util/axios"

export const login = (param) => {
  return user.request({
    url: '/user/login',
    method: 'post',
    data: param
  })
}

export const register = (param) => {
  return user.request({
    url: '/user/registerUser',
    method: 'post',
    data: param
  })
}

export const userInfo = (param) => {
  return user.request({
    url: '/user/userInfo',
    method: 'post',
    data: param
  })
}

export const updateUser = (param) => {
  return user.request({
    url: '/user/updateUser',
    method: 'post',
    data: param
  })
}

export const deleteUser = (param) => {
  return user.request({
    url: '/user/deleteUser',
    method: 'post',
    data: param
  })
}

export const projectList = (param) => {
  return project.request({
    url: '/project/listProject',
    method: 'post',
    data: param
  })
}

export const addProject = (param) => {
  return project.request({
    url: '/project/addProject',
    method: 'post',
    data: param
  })
}
export const getProject = (param) => {
  return project.request({
    url: '/project/getProject',
    method: 'post',
    data: param
  })
}
export const updateProject = (param) => {
  return project.request({
    url: '/project/updateProject',
    method: 'post',
    data: param
  })
}
export const deleteProject = (param) => {
  return project.request({
    url: '/project/deleteProject',
    method: 'post',
    data: param
  })
}

export const listProjectAllFiles = (param) => {
  return project.request({
    url: '/project/listProjectAllFiles',
    method: 'post',
    data: param
  })
}

export const listProjectFiles = (param) => {
  return project.request({
    url: '/project/listProjectFiles',
    method: 'post',
    data: param
  })
}

export const createFile = (param) => {
  return project.request({
    url: '/project/createFile',
    method: 'post',
    data: param
  })
}
export const readFile = (param) => {
  return project.request({
    url: '/project/readFile',
    method: 'post',
    data: param
  })
}
export const updateFile = (param) => {
  return project.request({
    url: '/project/updateFile',
    method: 'post',
    data: param
  })
}
export const deleteFile = (param) => {
  return project.request({
    url: '/project/deleteFile',
    method: 'post',
    data: param
  })
}
export const moveFile = (param) => {
  return project.request({
    url: '/project/moveFile',
    method: 'post',
    data: param
  })
}

export const mkDir = (param) => {
  return project.request({
    url: '/project/mkDir',
    method: 'post',
    data: param
  })
}

export const workStatus = (param) => {
  return project.request({
    url: '/project/workStatus',
    method: 'post',
    data: param
  })
}

export const commit = (param) => {
  return project.request({
    url: '/project/commit',
    method: 'post',
    data: param
  })
}
