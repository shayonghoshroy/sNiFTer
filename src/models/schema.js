export const schema = {
    "models": {
        "user": {
            "name": "user",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "username": {
                    "name": "username",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "password_hash": {
                    "name": "password_hash",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "usertype": {
                    "name": "usertype",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "favorites": {
                    "name": "favorites",
                    "isArray": true,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "nftWatchlist": {
                    "name": "nftWatchlist",
                    "isArray": true,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "walletWatchlist": {
                    "name": "walletWatchlist",
                    "isArray": true,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "version": "694d386811223d27d272bbfa37cba357"
};