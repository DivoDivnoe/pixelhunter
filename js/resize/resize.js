const resize = (frame, given) => {
  const ratio = given.width / given.height;
  const outOffsetWidth = given.width - frame.width;
  const outOffsetHeight = given.height - frame.height;
  const result = {};

  if (outOffsetWidth >= outOffsetHeight) {
    result.width = frame.width;
    result.height = Math.round(result.width / ratio);
  } else {
    result.height = frame.height;
    result.width = Math.round(result.height * ratio);
  }

  return result;
};

export default resize;
