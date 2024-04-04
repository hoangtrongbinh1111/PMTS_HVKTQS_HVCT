export function saveFile(filename, blob) {
  
    // get downloadable url from the blob
    const blobUrl = URL.createObjectURL(blob)
  
    // create temp link element
    let link = document.createElement("a")
    link.download = filename
    link.href = blobUrl
  
    // use the link to invoke a download
    document.body.appendChild(link)
    link.click()
  
    // remove the link
    setTimeout(() => {
      link.remove()
      window.URL.revokeObjectURL(blobUrl)
      link = null
    }, 0)
  }
  