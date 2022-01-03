const fs = require('fs')
const nodePath = require('path')
const { slugToTitle } = require('../plugins/helpers.js')

const getMenu = (contentFiles = [], contentPath = 'content') => {
  // console.log('$CONTENT-->>', contentFiles)
  function getDirectories(path) {
    path = path ? `${contentPath}/${path}` : contentPath
    // console.log('getDirectories', path)
    if (fs.existsSync(path) && isDir(path)) {
      //   console.log('getDir isDir:', path)
      return (
        fs
          .readdirSync(path)
          // .filter((item) => isDir(item))
          .map((dir) => {
            const dirPath = `${path}/${dir}`
              .replace(contentPath, '')
              .replace('//', '/')
            const depth = dirPath.split('/').length - 2
            return {
              // data: `/${dir}`,
              slug: dir,
              type: 'dir',
              dir: dirPath,
              depth,
              toggle: depth !== 0,
              children: [...getFiles(dirPath), ...getDirectories(dirPath)],
            }
          })
          .filter((item) => isDir(item.dir))
          .filter((item) => item.slug.charAt(0) !== '.')
          .filter((item) => item.slug.toLowerCase() !== 'templates')
      )
    } else {
      return []
    }
  }
  function getBySlugAndFullPath(slug, fullPath) {
    // console.log(slug, ' -- ', fullPath)
    const item = contentFiles.filter(
      (item) => item.slug === slug && item.path === fullPath
    )[0]
    // console.log('yo==>>', item)
    return {
      title: item?.title || slugToTitle(slug),
      description: item?.description || '',
      order: item?.order || 0,
    }
  }
  function getFiles(path) {
    path = path ? `${contentPath}/${path}` : contentPath
    // console.log('getFiles', path)
    if (fs.existsSync(path) && isDir(path)) {
      return fs
        .readdirSync(path)
        .filter((file) => nodePath.extname(file).toLowerCase() === '.md')
        .map((file) => {
          const slug = file.replace(/\..+$/, '')
          const fullPath = `/${path}/${file}`
            .replace(`/${contentPath}`, '')
            .replace('//', '/')
            .replace('.md', '')
          const { title, description, order } = getBySlugAndFullPath(
            slug,
            fullPath
          )
          // console.log('order', order);
          return {
            slug,
            type: 'file',
            title,
            description,
            dir: `/${path}`
              .replace(contentPath, '')
              .replace('//', '/')
              .replace('//', '/'),
            path: fullPath,
            order,
            depth: fullPath.split('/').length - 2,
          }
        })
        .filter((item) => !isDir(item.path))
        .sort((a, b) => (a.order > b.order ? 1 : -1))
      // .sort((a,b)=> (a.order > b.order ? 1 : -1))
    } else {
      return []
    }
  }
  function isDir(path) {
    path = `${contentPath}/${path}`.replace(
      `${contentPath}/${contentPath}`,
      contentPath
    )
    if (!fs.existsSync(path)) {
      return false
    }
    return fs.lstatSync(path).isDirectory()
  }
  return [...getFiles(), ...getDirectories()]
}

export { getMenu }
