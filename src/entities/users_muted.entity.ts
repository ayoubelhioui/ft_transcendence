// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

// import { User, Channel } from './index';

// @Entity()
// class UsersMuted{
//     @PrimaryGeneratedColumn()
//     public id: number;

//     // @PrimaryColumn({ name: 'channel' })
//     @ManyToOne(() => Channel, (channel) => channel.channelMessages, { cascade: true })
//     channel : Channel;

//     // @PrimaryColumn({ name: 'user' })
//     @ManyToOne(() => User, (user) => user.channelMessages ,{ cascade: true })
//     user : User;

//     @Column()
//     public expirationTime: Date;
// }

// export default UsersMuted;