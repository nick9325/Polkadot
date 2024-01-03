#![cfg_attr(not(feature = "std"), no_std, no_main)]


#[ink::contract]
mod bank {

    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct Bank {
        owner: AccountId,
        balances: Mapping<AccountId, Balance>,
    }

    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: AccountId,
        #[ink(topic)]
        to: AccountId,
        value: Balance,
    }

    impl Bank {
        #[ink(constructor, payable)]
        pub fn new() -> Self {
            let caller = Self::env().caller();
            let balances = Mapping::default();
            Self {
                owner: caller,
                balances,
            }
        }

        // Get the balance of an account
        #[ink(message)]
        pub fn get_balance(&self, account: AccountId) -> Option<Balance> {
            self.balances.get(account)
        }

        #[ink(message, payable)]
        pub fn transfer_to_account(&mut self, to: AccountId, value: Balance) -> bool {
            let caller = self.env().caller();
            let caller_balance = self.balances.get(caller).unwrap_or(0);

            if caller_balance < value {
                return false;
            }

            self.balances.insert(caller, &(caller_balance - value));
            let to_balance = self.balances.get(to).unwrap_or(0);
            self.balances.insert(to, &(to_balance + value));

            self.env().emit_event(Transfer {
                from: caller,
                to,
                value,
            });

            true
        }

        #[ink(message)]
        pub fn withdraw(&mut self, amount: Balance) -> bool {
            let caller = self.env().caller();
            let caller_balance = self.balances.get(caller).unwrap_or(0);

            if caller_balance < amount {
                return false;
            }

            self.balances.insert(caller, &(caller_balance - amount));
            true
        }

        #[ink(message, payable)]
        pub fn add_balance(&mut self, amount: Balance) {
            let caller = self.env().caller();
            let caller_balance = self.balances.get(caller).unwrap_or(0);
            self.balances.insert(caller, &(caller_balance + amount));
        }
    }
}
