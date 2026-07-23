/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Pet, PageRoute, PetType, AdoptionApplication } from './types';
import { INITIAL_PETS } from './data/petsData';
import { 
  getStoredFavorites, 
  saveStoredFavorites, 
  getStoredApplications 
} from './utils/storage';

// Components & Views
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdoptionModal } from './components/AdoptionModal';
import { HomeView } from './views/HomeView';
import { PetsView } from './views/PetsView';
import { PetDetailView } from './views/PetDetailView';
import { ProcessView } from './views/ProcessView';
import { ApplicationsView } from './views/ApplicationsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';

import { AnimatePresence, motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites());
  const [applications, setApplications] = useState<AdoptionApplication[]>(getStoredApplications());
  
  // Navigation Routing
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [initialPetType, setInitialPetType] = useState<PetType>('all');

  // Adoption Modal State
  const [selectedPetForModal, setSelectedPetForModal] = useState<Pet | null>(null);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);

  // Toast Notice System
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync favorites state
  const handleToggleFavorite = (petId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(petId);
      const updated = exists ? prev.filter(id => id !== petId) : [...prev, petId];
      saveStoredFavorites(updated);
      
      const pet = pets.find(p => p.id === petId);
      if (pet) {
        showToast(exists ? `已將 ${pet.name} 移除愛心收藏` : `已加入 ${pet.name} 至愛心收藏 💖`);
      }
      return updated;
    });
  };

  // Handle Hash Router Sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash || hash === '') {
        setCurrentRoute('home');
        setSelectedPetId(null);
      } else if (hash.startsWith('pet/')) {
        const id = hash.replace('pet/', '');
        const found = pets.find(p => p.id === id);
        if (found) {
          setSelectedPetId(id);
          setCurrentRoute('pet-detail');
        } else {
          setCurrentRoute('pets');
        }
      } else if (['home', 'pets', 'process', 'applications', 'about', 'contact'].includes(hash)) {
        setCurrentRoute(hash as PageRoute);
        setSelectedPetId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pets]);

  // Navigate Handler
  const handleNavigate = (route: PageRoute, petTypeFilter?: PetType) => {
    if (petTypeFilter) {
      setInitialPetType(petTypeFilter);
    }
    setCurrentRoute(route);
    setSelectedPetId(null);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPetDetail = (petId: string) => {
    setSelectedPetId(petId);
    setCurrentRoute('pet-detail');
    window.location.hash = `#/${petId ? `pet/${petId}` : 'pets'}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdoptModal = (pet: Pet) => {
    setSelectedPetForModal(pet);
    setIsAdoptModalOpen(true);
  };

  const handleApplicationSubmitted = () => {
    setApplications(getStoredApplications());
    showToast('🎉 認養意願申請單送出成功！可在「我的申請」查看狀態。');
  };

  const selectedPetObject = pets.find(p => p.id === selectedPetId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 text-slate-800 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-900 relative overflow-x-hidden">
      
      {/* Frosted Glass Ambient Glowing Background Blobs */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-orange-200/60 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none z-0"></div>
      <div className="fixed top-1/3 -right-24 w-96 h-96 bg-teal-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none z-0"></div>
      <div className="fixed -bottom-24 left-1/3 w-96 h-96 bg-rose-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none z-0"></div>

      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        selectedPetId={selectedPetId}
        favoritesCount={favorites.length}
        applicationsCount={applications.length}
        onNavigate={handleNavigate}
      />

      {/* Main View Area with Smooth Transitions */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {currentRoute === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <HomeView
                pets={pets}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onOpenAdoptModal={handleOpenAdoptModal}
                onSelectPetDetail={handleSelectPetDetail}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentRoute === 'pets' && (
            <motion.div
              key="pets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <PetsView
                pets={pets}
                favorites={favorites}
                initialType={initialPetType}
                onToggleFavorite={handleToggleFavorite}
                onOpenAdoptModal={handleOpenAdoptModal}
                onSelectPetDetail={handleSelectPetDetail}
              />
            </motion.div>
          )}

          {currentRoute === 'pet-detail' && selectedPetObject && (
            <motion.div
              key={`pet-${selectedPetObject.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <PetDetailView
                pet={selectedPetObject}
                allPets={pets}
                isFavorite={favorites.includes(selectedPetObject.id)}
                onToggleFavorite={handleToggleFavorite}
                onOpenAdoptModal={handleOpenAdoptModal}
                onSelectPetDetail={handleSelectPetDetail}
                onBackToPets={() => handleNavigate('pets')}
              />
            </motion.div>
          )}

          {currentRoute === 'process' && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProcessView onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentRoute === 'applications' && (
            <motion.div
              key="applications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ApplicationsView
                applications={applications}
                favorites={favorites}
                allPets={pets}
                onToggleFavorite={handleToggleFavorite}
                onOpenAdoptModal={handleOpenAdoptModal}
                onSelectPetDetail={handleSelectPetDetail}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentRoute === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AboutView onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentRoute === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ContactView onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Adoption Form Modal */}
      <AdoptionModal
        pet={selectedPetForModal}
        isOpen={isAdoptModalOpen}
        onClose={() => setIsAdoptModalOpen(false)}
        onApplicationSubmitted={handleApplicationSubmitted}
        onNavigateToApplications={() => handleNavigate('applications')}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-amber-900/95 text-amber-50 px-5 py-3 rounded-2xl shadow-2xl border border-amber-700/80 flex items-center gap-3 backdrop-blur-md text-xs sm:text-sm font-bold"
          >
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
