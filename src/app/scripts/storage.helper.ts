export function isSessionStorageSupported() {
    var storage = window.sessionStorage;
    try {
      storage.setItem('test', 'test');
      storage.removeItem('test');    
      return true;
    } catch (e) {
      return false;
    }
}