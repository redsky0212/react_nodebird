module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        nickname: {
            type: DataTypes.STRING(20), // 20글자 이하
            allowNull: false,           // false : 필수
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,       // 고유한 값
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글저장을 위한 셋팅
    });

    User.associate = (db) => {  // 관계도 관련 내용( 다대다, 일대다 등)
        db.User.hasMany(db.Post);   // 한사람이 여러글을 쓸 수 있다.
        db.User.hasMany(db.Comment);    // 한사람이 여러댓글을 쓸 수 있다.
    };

    return User;
}