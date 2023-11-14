self.onmessage = (e) => {
    const {Script, Body} = e.data
    const Func = new Function(Script)()
    const result = Func(Body)
    self.postMessage(result);
}