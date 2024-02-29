import swal from 'sweetalert';

export default {
    methods: {
        flash(message) {
            swal('Success!', message, 'success')
        }
    }
}