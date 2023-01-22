import Toastify from 'toastify-js'

class Toast {
    static makeToast(msg: string, error = false) {
        Toastify({
          text: msg,
          duration: 4000,
          newWindow: true,
          close: true,
          gravity: 'top', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: error ? '#f44336' : '#1F2937'
          } // Callback after click
        }).showToast()
      }
  }

export default Toast