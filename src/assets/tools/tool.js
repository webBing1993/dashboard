class Tool {
    //不为空
    isNotBlank(val) {
        if (typeof(val) == "undefined" || val == null || val == "") {
            return false;
        }
        return true;
    }
    //为空
    isBlank(val) {
        if (typeof(val) == "undefined" || val == null || val == "") {
            return true;
        }
            return false;
        }
}

export default new Tool()