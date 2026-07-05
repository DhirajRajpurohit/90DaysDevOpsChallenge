
#!/bin/bash


create_user() {
    read -p "Enter Username: " username

    if id "$username" &>/dev/null
    then
        echo "User already exists!"
    else
        read -s -p "Enter Password: " password
        echo

        sudo useradd "$username"
        echo "$username:$password" | sudo chpasswd

        echo "User '$username' created successfully."
    fi
}

delete_user() {
    read -p "Enter Username: " username

    if id "$username" &>/dev/null
    then
        sudo userdel "$username"
        echo "User '$username' deleted successfully."
    else
        echo "User does not exist."
    fi
}

reset_password() {
    read -p "Enter Username: " username

    if id "$username" &>/dev/null
    then
        read -s -p "Enter New Password: " password
        echo

        echo "$username:$password" | sudo chpasswd

        echo "Password updated successfully."
    else
        echo "User does not exist."
    fi
}

list_users() {
    echo "Username     UID"
    echo "---------------------"

    awk -F: '{print $1,"\t",$3}' /etc/passwd
}

case "$1" in
    -c|--create)
        create_user
        ;;
    -d|--delete)
        delete_user
        ;;
    -r|--reset)
        reset_password
        ;;
    -l|--list)
        list_users
        ;;
    -h|--help)
        show_help
        ;;
    *)
        echo "Invalid Option"
        show_help
        ;;
esac
