#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod todo_list {

    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    #[ink(storage)]
    pub struct TodoList {
        tasks: Vec<String>,
    }

    impl TodoList {

        #[ink(constructor)]
        pub fn new() -> Self {
            Self { 
                tasks: Vec::new(),
             }
        }

        #[ink(message)]
        pub fn add_task(&mut self,task: String) {
            self.tasks.push(task)
        }

        #[ink(message)]
        pub fn get_tasks(&self) -> Vec<String> {
            self.tasks.clone().into_iter().collect()
        }

        #[ink(message)]
        pub fn edit_task(&mut self, index: u32, new_task: String) -> bool {
            if let Some(task) = self.tasks.get_mut(index as usize) {
                *task = new_task;
                true
            } else {
                false
            }
        }
    
        #[ink(message)]
        pub fn delete_task(&mut self, index: u32) -> bool {
            if index < self.tasks.len() as u32 {
                self.tasks.remove(index as usize);
                true
            } else {
                false
            }
        }
    }
}
