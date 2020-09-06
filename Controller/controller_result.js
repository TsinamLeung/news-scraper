let searchResult = []

function pushSearchResult(res) {
  searchResult = searchResult.concat(res)
}

function popSearchResult() {
  const stopFlag = false
  const stopper = setTimeout(() => {
    stopFlag = true
  }, 1000)
  const ret = []
  while (searchResult.length > 0 && !stopFlag) {
    ret.push(searchResult.shift())
  }
  clearTimeout(stopper)
  return ret
}

function isEmptySearchResult() {
  return !(searchResult.length > 0)
}
module.exports = {
  popSearchResult,
  pushSearchResult
}
