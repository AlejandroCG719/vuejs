Vue.component('tasks', {
    template :`<section class="todoapp">
    <header class="header">
        <h1>Tareas </h1>
            <input @keyup.enter="add" v-model="newTasks" type="text" class="new-todo" placeholder="Que deseas hacer?">
    </header>
    <section>
        <ul class="todo-list">
            <li class="todo" v-for="task in tasks" is="task" :task="task"></li>            
        </ul>
    </section>
    <footer class="footer" v-show="tasks.length">
            <span class="todo-count">Completas: {{ completed }} | Incompletas: {{ incompleted }}</span>
    </footer>
    </section>`,
    data: function (){
        return {
            newTasks:"",
                tasks:[
                {title: "Aprender PHP", completed: true},
                {title: "Aprender Laravel", completed: true},
                {title: "Aprender VueJs", completed: false},
            ]
        }
    },
    methods: {
        reverse: function () {
            this.message = this.message.split('').reverse().join('')
        },
        add: function () {
            if (this.newTasks.length <= 1) return alert('La tarea no puede estar vacia');
            this.tasks.push({
                title: this.newTasks,
                completed: false
            });
            this.newTasks = "";
        }
    },
    computed: {
        completed: function () {
            //console.log("Trigger completedTask");
            return this.tasks.filter(function (task) {
                return task.completed;
            }).length;
        },
        incompleted: function () {
            //console.log("Trigger incompletedTask");
            return this.tasks.filter(function (task) {
                return !task.completed;
            }).length;
        }
    }
});
Vue.component('task', {
    props:['task'],
    template: `<li :class="classes">
        <div class="view">
            <input class="toggle" type="checkbox" v-model="task.completed"/>
            <label v-text="task.title" @dblclick="edit()"></label>
            <button class="destroy" @click="remove()"></button>    
        </div>
                        
        <input class="edit" v-model="task.title" @keyup.enter="doneEdit()" @blur="doneEdit()" @keyup.esc="cancelEdit()">
    </li>`,
    data : function (){
        return{
            editing: false,
            cacheBeforeEdit: ''
        }
    },
    methods: {
        edit:function(){
            this.cacheBeforeEdit= this.task.title;
            this.editing  = true;
        },
        doneEdit:function(){
            if(! this.task.title){
                this.remove();
            }
            this.editing = false
        },
        cancelEdit: function(){
            this.editing = false;
            this.task.title = this.cacheBeforeEdit;
        },
        remove: function(){
            var tasks =this.$parent.tasks;

            tasks.splice(tasks.indexOf(this.task),1);
        }
    },
    computed: {
        classes: function(){
            console.log('css Change');
            return { completed : this.task.completed,editing: this.editing }
       }
    }
});


var app = new Vue({el: '#app'})