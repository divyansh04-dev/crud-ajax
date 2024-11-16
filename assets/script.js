
$(document).ready(function () {
    getdata();

    $(document).on('click', '.statusbtn', function (e) {
        e.preventDefault();
        // console.log('clicked');
        var btn = $(this).closest('tr').find('.statusbtn');
        var user_id = $(this).closest('tr').find('.user_id').text();
        var newStatus = $(this).data('stat');

        $.ajax({
            type: "POST",
            url: "php-code/status.php",
            data: {
                id: user_id,
                newStatus: newStatus,
            },
            dataType: 'json',
            success: function (response) {
                if (response == 200) {
                    if (newStatus == 0) {
                        btn.text('Inactive');
                        btn.data('stat', 1);
                        btn.removeClass("btn-success");
                        btn.addClass("btn-secondary");
                    } else {
                        btn.text('Active');
                        btn.data('stat', 0);
                        btn.removeClass("btn-secondary");
                        btn.addClass("btn-success");

                    }
                }
            }
        });

    });

    $('.user_remove').click(function (e) {
        e.preventDefault();
        var user_id = $('.user_id_remove').val();
        // alert(user_id);

        $.ajax({
            type: "POST",
            url: "php-code/remove.php",
            data: {
                'checking_remove': true,
                'user_id': user_id,
            },
            success: function (response) {
                // console.log(response);
                $('#removemodal').modal('hide');
                $('.show_message').append('\
                    <div class="alert alert-success alert-dismissible fade show" role="alert">\
                    <strong>Success !</strong> '+ response + '.\
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
                    </div>\
                    ');
                $('.userdata').html('');
                getdata();
            }
        });

    });

    $(document).on('click', '.removebtn', function () {
        var user_id = $(this).closest('tr').find('.user_id').text();
        // console.log($user_id);
        $('.user_id_remove').val(user_id);
        $('#removemodal').modal('show');

    });

    $('.update_data_user').click(function (e) {
        e.preventDefault();
        var user_id = $('.user_id_update').val();
        var name = $('.name_update').val();
        var email = $('.email_update').val();
        var phone = $('.phone_update').val();
        var password = $('.password_update').val();
        var address = $('.address_update').val();

        if (name != '' && email != '' && phone != '' && password != '' && address != '') {
            $.ajax({
                type: "POST",
                url: "php-code/update.php",
                data: {
                    'checking_updates': true,
                    'user_id': user_id,
                    'name': name,
                    'email': email,
                    'phone': phone,
                    'password': password,
                    'address': address,
                },
                success: function (response) {
                    // console.log(response);
                    $('#updatemodal').modal('hide');
                    $('.show_message').append('\
                        <div class="alert alert-success alert-dismissible fade show" role="alert">\
                        <strong>Success !</strong> '+ response + '.\
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
                        </div>\
                        ');
                    $('.userdata').html('');
                    getdata();
                }
            });

        }
        else {
            //console.log('recorded failed');
            $('.error_message_update').append('\
                <div class="alert alert-warning alert-dismissible fade show" role="alert">\
                    <strong>Hey !</strong> Please enter all fields.\
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
                </div>\
            ');
        }

    });

    $(document).on('click', '.updatebtn', function () {
        var user_id = $(this).closest('tr').find('.user_id').text();
        // alert(user_id);
        $.ajax({
            type: "POST",
            url: "php-code/update.php",
            data: {
                'checking_update': true,
                'user_id': user_id,
            },
            success: function (response) {
                // console.log(response);
                $.each(response, function (key, update) {
                    // console.log(update['name']);
                    $('.user_id_update').val(update['user_id']);
                    $('.name_update').val(update['name']);
                    $('.email_update').val(update['email']);
                    $('.phone_update').val(update['phone']);
                    $('.password_update').val(update['password']);
                    $('.address_update').val(update['address']);
                });
                $('#updatemodal').modal('show');
            }
        });
    });

    $(document).on('click', '.viewbtn', function () {
        var user_id = $(this).closest('tr').find('.user_id').text();
        // alert(user_id);
        $.ajax({
            type: "POST",
            url: "php-code/insert.php",
            data: {
                'checking_view': true,
                'user_id': user_id,
            },
            success: function (response) {
                // console.log(response);
                $.each(response, function (key, view) {
                    // console.log(view['name']);
                    $('.name_view').text(view['name']);
                    $('.email_view').text(view['email']);
                    $('.phone_view').text(view['phone']);
                    $('.password_view').text(view['password']);
                    $('.address_view').text(view['address']);
                    $('.status_view').text(view['status']);
                });
                $('#viewmodal').modal('show');
            }
        });
    });

    $('.add_data_user').click(function (e) {
        e.preventDefault();
        var name = $('.name').val();
        var email = $('.email').val();
        var phone = $('.phone').val();
        var password = $('.password').val();
        var address = $('.address').val();

        if (name != '' && email != '' && phone != '' && password != '' && address != '') {
            $.ajax({
                type: "POST",
                url: "php-code/insert.php",
                data: {
                    'checking_add': true,
                    'name': name,
                    'email': email,
                    'phone': phone,
                    'password': password,
                    'address': address,
                },
                success: function (response) {
                    // console.log(response);
                    $('#addemployee').modal('hide');
                    $('.show_message').append('\
                        <div class="alert alert-success alert-dismissible fade show" role="alert">\
                        <strong>Success !</strong> '+ response + '.\
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
                        </div>\
                        ');
                    $('.userdata').html('');
                    getdata();
                }
            });

        }
        else {
            //console.log('recorded failed');
            $('.error_message').append('\
                <div class="alert alert-warning alert-dismissible fade show" role="alert">\
                    <strong>Hey !</strong> Please enter all fields.\
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
                </div>\
            ');
        }

    });
});

function getdata() {
    $.ajax({
        type: "GET",
        url: "php-code/read.php",
        success: function (response) {
            // console.log(response);
            $.each(response, function (key, value) {
                //  console.log(value['name']);
                var check = value['status'] == '0' ? '<button data-stat="1" class="btn btn-sm rounded-pill btn-secondary statusbtn">In-active</button>' : '<button data-stat="0" class="btn btn-sm rounded-pill btn-success statusbtn">Active</button>';

                $('.userdata').append('<tr class="text-center">' +
                    '<td class="user_id">' + value['user_id'] + '</td>\
                        <td>'+ value['name'] + '</td>\
                        <td>'+ value['email'] + '</td>\
                        <td>'+ value['phone'] + '</td>\
                        <td>'+ value['password'] + '</td>\
                        <td>'+ value['address'] + '</td>\
                        <td>'+ check + '</td>\
                        <td>\
                            <a href="#" class="btn btn-sm rounded-pill btn-primary viewbtn">view</a>\
                            <a href="#" class="btn btn-sm rounded-pill btn-success updatebtn">update</a>\
                            <a href="#" class="btn btn-sm rounded-pill btn-danger removebtn">remove</a>\
                        </td>\
                    </tr>');
            });
        }
    });
}